import io, os, botocore, boto3, struct, re
from .utils import fnv164, fnv132
from PIL import Image

FILE_ALLOW_FORMATS= ('JPEG','JPEG2000','PNG','WEBP','GIF','ICO','TGA','PCX','BMP','TIFF','DDS')

AWS_BUCKET= os.environ.get("AWS_BUCKET")
AWS_BUCKET_HOST= os.environ.get("AWS_BUCKET_HOST")

DEFAULT_ICON= {
  "user": "3216b3625168ff177d32469davatar0.png",
  "workspace": "9b91c73edab5806d5cdcf677workspace0.png",
  "project": "2661dec0e01b1ff5495e106fproject0.png",
  "board": "8ee818bb02ce3a8c2d87071aboard0.png"
}

DEFAULT_THUMBNAIL= {
  "workspace": "9b91c73edab5806d5cdcf677workspace0.png",
  "project": "2661dec0e01b1ff5495e106fproject0.png",
  "board": "8ee818bb02ce3a8c2d87071aboard0.png"
}

aws_client= boto3.client('s3')

def _resolve_filename_for(type, name, ext):
  _type= type.lower()
  _name= name.lower()

  hashes= (
    fnv164(f"{os.environ.get('FLASK_APP_KEY').lower()}::{_type}::{_name}", text=True),
    fnv132(f"{_type}::{_name}", text=True)
  )

  return "".join([v for v in hashes]) + f"{_type}{_name}.{ext}"

def get_public_link(filename):
  return f"{AWS_BUCKET_HOST}/{AWS_BUCKET}/{filename}"

def uploadFile(filestorage, type, destname):

  srcname= re.findall(r"([^/:?]+\.(.*)|[^/:?]+)$", filestorage.filename)
  if not srcname[1]: ext= srcname[0]
  else: ext= srcname[1]

  if type == 'avatar': infile = convert_avatar_image(infile)

  s3path= _resolve_filename_for(type, destname, ext)

  aws_client.upload_fileobj(infile, AWS_BUCKET, s3path)
  return s3path

def convert_avatar_image(file):
  with open(file, 'rb') as infile:
    with Image.open(infile, formats=FILE_ALLOW_FORMATS) as img:

      # we need the image in RGB
      if not img.mode == 'RGB': 
        img = img.convert('RGB')

      # get index of the small and large sides of the image
      sides= (0,1) if img.size[0] < img.size[1] else (1,0)

      # reduce the image to be 128px on the SMALLEST side
      factor= 1.0/img.size[sides[0]] * 128
      new_size= (int(img.size[0] * factor), int(img.size[1] * factor))
      img= img.resize(new_size, resample=Image.Resampling.BICUBIC)

      # if LARGEST side is > 128, crop it towards center
      if img.size[sides[1]] > 128:
        factor= int((img.size[sides[1]] - 128) * .5)
        img= img.crop((factor, 0, factor+128, 128) if sides[1] == 0 else (0, factor, 128, factor+128))

      # dump the new image into a file-like object in WEBP format
      outdata= io.BytesIO()
      img.save(outdata, format='WEBP', quality=33)
      outdata.seek(0)

      return outdata
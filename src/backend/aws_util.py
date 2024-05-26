import io, os, botocore, boto3, struct
import api_utils
from PIL import Image

FILE_ALLOW_FORMATS= ('JPEG','JPEG2000','PNG','WEBP','GIF','ICO','TGA','PCX','BMP','TIFF','DDS')

s3b= None

def initializeClientRemote():
  s3b= boto3.client('s3').Bucket(os.environ.get("AWS_BUCKET"))

def _resolve_filename_for(type, name):
  type= type.lower()
  name= name.lower()

  hashes= (
    api_utils.fnv164(f"{os.environ.get("FLASK_APP_KEY").lower()}::{type}::{name}"),
    api_utils.fnv132(f"{type}::{name}")
  )

  return 

def uploadFile(infile, type, filename):
  if type == 'avatar':
    infile = convert_avatar_image(infile)

  s3path= _resolve_filename_for(type, filename)

  s3b.upload_fileobj(infile, os.environ.get("AWS_BUCKET"), s3path)

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
      iobytes= io.BytesIO()
      img.save(iobytes, format='WEBP', quality=33)
      iobytes.seek(0)

      return iobytes
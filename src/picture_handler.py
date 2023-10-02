import os
from PIL import Image
from flask import url_for, current_app
from werkzeug.utils import secure_filename

ALLOWED_EXTENSIONS = {'jpg', 'png'}


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def add_profile_pic(pic_upload, username):
    try:
        if not allowed_file(pic_upload.filename):
            # If the uploaded file doesn't have an allowed extension, raise an exception.
            raise ValueError('Invalid file extension')

        filename = secure_filename(pic_upload.filename)
        ext_type = filename.split('.')[-1]
        storage_filename = str(username) + '.' + ext_type
        filepath = os.path.join(current_app.root_path, 'src/front/img', storage_filename)
        output_size = (200, 200)
        pic = Image.open(pic_upload)
        pic.thumbnail(output_size)
        pic.save(filepath)
        print(f"Filepath: {filepath}")
        print(f"Storage Filename: {storage_filename}")
        return storage_filename
    except Exception as e:
        print(f"Error at saving the picture: {str(e)}")
        return None
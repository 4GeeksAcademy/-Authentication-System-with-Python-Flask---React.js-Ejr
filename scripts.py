import os, sys

if __name__ == '__main__':
    
    if '--remake' in sys.argv:
      os.system("flask wipe-db")
      os.system("rm -rf migrations")
      os.system("flask db init")
      os.system("flask db upgrade")
      os.system("flask db migrate")
      os.system("flask db upgrade")

    if '--tailwind-cleaner' in sys.argv:

      path="./src/frontend/styles"

      inname="_builder.tss"
      rawname= "_tailwind_raw.css"
      outname= "tailwind.css"

      print("generating tailwind raw css...")
      os.system(f"npx tailwindcss -i {path}/{inname} -o {path}/{rawname}")
      print(f"cleaning {rawname}...")
      try:
        outdata= []
        longskip= False
        with open(f"{path}/{rawname}", 'r') as infile:
          for line in infile:
            linetest= line.lower().strip()
            if longskip:
              if '*/' in linetest: longskip= False
              continue
            if linetest.startswith('/*'):
              longskip= not '*/' in linetest
              continue
            if not linetest: continue
            if linetest.startswith('}'): line+= "\n"
            outdata.append(line)
      
      except FileNotFoundError:
        print(f"Unable to locate {rawname}... nothing was changed")
        pass
        
      try:
        with open(f"{path}/{outname}", 'w') as outfile:
          for data in outdata:
            outfile.write(data)
          outfile.close()
      
      except FileNotFoundError:
        print(f"Unable to create {outname}.. nothing was changed")
        pass

      os.remove(f"{path}/{rawname}")
        
      print("ok")
          
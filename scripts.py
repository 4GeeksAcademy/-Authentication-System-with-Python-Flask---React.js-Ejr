import os, sys, shutil

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
      removals=[]

      # PHASE 1: load all our files and append them to _tailwind.tss before generating the css
      print("appending our tailwind css modules...")

      inname="_tailwind.tss"
      outname="_tailwind_joined.tss"

      # the files to append
      includes=[
        "_tailwind.miguel.tss",
        "_tailwind.andrei.tss",
        "_tailwind.sopze.tss"
      ]
      
      shutil.copyfile(f"{path}/{inname}", f"{path}/{outname}")
      removals.append(f"{path}/{outname}")

      try:
        with open(f"{path}/{outname}", 'a') as outfile:

          for include in includes:
            with open(f"{path}/{include}", 'r') as infile:
              for line in infile:
                outfile.write(line)
          
          outfile.close()
      except FileNotFoundError:
        print(f"Error joining _tailwind.###.tss files with _tailwind.tss... make sure all files exist")
        pass

      # generate the css through tailwindcss npm package (npx tailwindcss)
      print("generating tailwind css...")

      inname="_tailwind_joined.tss"
      rawname= "_tailwind_generated.css"
      outname= "tailwind.css"

      os.system(f"npx tailwindcss -i {path}/{inname} -o {path}/{rawname}")
      removals.append(f"{path}/{rawname}")
      
      # clean the generated css (the mf tailwind puts a LOT of comments there)
      print(f"cleaning resulting css")
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
        print(f"unable to locate file {rawname}... nothing was changed")
        pass
        
      try:
        with open(f"{path}/{outname}", 'w') as outfile:
          for data in outdata:
            outfile.write(data)
          outfile.close()
      
      except FileNotFoundError:
        print(f"unable to create file {outname}.. nothing was changed")
        pass

      for removal in removals:
        os.remove(removal)
        
      print(f"\033[1;32m\nseems ok\n\033[0m")
          
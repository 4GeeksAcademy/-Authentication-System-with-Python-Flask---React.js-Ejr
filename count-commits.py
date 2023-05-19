import subprocess

tempfile = "tempfile.txt"

# Ejecutar el comando git log y guardar la salida en el archivo tempfile.txt
subprocess.run(['git', 'log', '--no-merges', '--pretty=format:%ae'], stdout=open(tempfile, 'w'), encoding='utf-8')

# Leer el contenido del archivo tempfile.txt y extraer los nombres de usuario
with open(tempfile, 'r', encoding='utf-8') as file:
    emails = [line.strip().split('@')[0] for line in file]

# Obtener la lista única de nombres de usuario
usernames = sorted(set(emails))

# Contar los commits para cada nombre de usuario y mostrar el resultado
for username in usernames:
    count = subprocess.run(['git', 'log', '--no-merges', '--author=' + username, '--oneline'], capture_output=True, encoding='utf-8')
    count = len(count.stdout.strip().split('\n'))
    print(f"Username: {username} - Commits: {count}")

# Eliminar el archivo tempfile.txt
subprocess.run(['rm', tempfile])

input("Presiona Enter para continuar...")

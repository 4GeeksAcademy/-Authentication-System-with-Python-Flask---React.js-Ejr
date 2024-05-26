import os, re, fnvhash

def fnv132(data):
  if type(data) == str: data= bytes(data, 'utf-8')
  value= fnvhash.fnv(
    data,
    2166136261,
    16777619,
    0x100000000
  )
  hexv= re.search(r"(?<=[Xx]).*$", hex(value) )[0]
  if len(hexv) < 8: hexv= "0"*(8-len(hexv))
  return hexv

def fnv164(data):
  if type(data) == str: data= bytes(data, 'utf-8')
  value= fnvhash.fnv(
    data, 
    14695981039346656037, 
    1099511628211,
    0x10000000000000000
  )
  hexv= re.search(r"(?<=[Xx]).*$", hex(value) )[0]
  if len(hexv) < 16: hexv= "0"*(16-len(hexv))
  return hexv

def _resolve_filename_for(type, name):
  type= type.lower()
  name= name.lower()

  hashes= (
    fnv164(f"la_coyuntura_de_los_afluentes_tamizados::{type}::{name}"),
    fnv132(f"{type}::{name}")
  )

  return f"{hashes[0]}{hashes[1]}{type}{name}"

print("avatar 0.png")
print(_resolve_filename_for("avatar", "0.png"))

print("workspace 0.png")
print(_resolve_filename_for("workspace", "0.png"))

print("project 0.png")
print(_resolve_filename_for("project", "0.png"))

print("board 0.png")
print(_resolve_filename_for("board", "0.png"))
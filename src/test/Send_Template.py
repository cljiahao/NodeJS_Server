import requests

url = "http://10.28.79.23:3000/upload/ct800"

files = {'file': ("test.txt",open('./test.txt','rb'),'text/plain')}

res = requests.post(url,files=files)

print(res.status_code)
print(res.text)
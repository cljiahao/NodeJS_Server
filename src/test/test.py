import requests

url = "http://localhost:3000/upload/test"

files = {'file': ("text.txt",open('./test/test.txt','rb'),'text/plain')}

res = requests.post(url,files=files)

print(res.status_code)
print(res.text)
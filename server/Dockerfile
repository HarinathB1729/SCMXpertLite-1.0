# 
FROM python:3.9

# 
WORKDIR /Server

# 
COPY ./requirements.txt /Server/requirements.txt

# 
RUN pip install --no-cache-dir --upgrade -r /Server/requirements.txt

# 
COPY . .

#
EXPOSE 8000

# 
# CMD ["uvicorn", "server:app","--reload", "--host", "0.0.0.0", "--port", "8000"]
CMD ["python", "server.py"]
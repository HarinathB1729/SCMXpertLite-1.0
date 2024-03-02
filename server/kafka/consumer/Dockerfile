# 
FROM python:3.12

# 
WORKDIR /consumer

# 
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

# 
COPY ./Consumer.py /consumer/Consumer.py

# 
CMD ["python", "Consumer.py"]
# Use an official Python runtime as the base image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /producer

# Copy the current directory contents into the container at /producer
COPY . /producer

# Install any needed dependencies specified in requirements.txt (if any)
# RUN pip install --no-cache-dir -r requirements.txt
RUN pip install python-dotenv confluent-kafka


# Run python script when the container launches
CMD ["python", "Producer.py"]

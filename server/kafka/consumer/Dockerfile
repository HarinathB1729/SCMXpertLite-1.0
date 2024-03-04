# Use an official Python runtime as the base image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /consumer

# Copy the current directory contents into the container at /consumer
COPY . /consumer

# Install any needed dependencies specified in requirements.txt (if any)
RUN pip install python-dotenv confluent-kafka pymongo

# Run python script when the container launches
CMD ["python", "Consumer.py"]

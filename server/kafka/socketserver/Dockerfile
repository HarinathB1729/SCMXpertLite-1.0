# Use an official Python runtime as the base image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /socketserver

# Copy the current directory contents into the container at /socketserver
COPY . /socketserver

# Install any needed dependencies specified in requirements.txt (if any)
RUN pip install python-dotenv

# Run python script when the container launches
CMD ["python", "SocketServer.py"]

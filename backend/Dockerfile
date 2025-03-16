FROM python:3.10

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire backend directory structure
COPY . /app

# Set the Python path to include the parent directory
ENV PYTHONPATH=/

CMD ["uvicorn", "app.app:app", "--host", "0.0.0.0", "--port", "8000"]


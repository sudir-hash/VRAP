FROM python:3.10.9
WORKDIR /app
COPY . /app
RUN pip install -r requirements.txt
ENV DATABASE_URL "mongodb+srv://sudhir:7UPfJvYSuYq6q-B@vrap.cm7fcsl.mongodb.net/?retryWrites=true&w=majority"
EXPOSE 8003
CMD ["python", "main.py"]

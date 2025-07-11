FROM python:3.9-slim-buster
LABEL authors="gabrielmendanha"

WORKDIR /back

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

COPY . .

ENV FLASK_APP='run.py'
ENV FLASK_ENV='development'
ENV FLASK_DEBUG='1'

CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0", "--port=8000"]
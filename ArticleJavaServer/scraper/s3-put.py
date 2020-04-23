#!/usr/bin/python3
import boto3
import sys
import os

filename = sys.argv[1]
print("in s3-put.py sending " + filename)

AWS_S3_ARTICLE_BUCKET  = os.getenv('AWS_S3_ARTICLE_BUCKET', 'dev.publiceditor.io')
AWS_S3_ARTICLE_PREFIX  = os.getenv('AWS_S3_ARTICLE_PREFIX', 'articles/')
result = boto3.client('s3').upload_file(filename, AWS_S3_ARTICLE_BUCKET, AWS_S3_ARTICLE_PREFIX + filename)

print("s3-put.py finished")
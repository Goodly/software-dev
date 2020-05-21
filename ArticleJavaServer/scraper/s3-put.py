#!/usr/bin/python3
import boto3
import sys
import os

AWS_S3_ARTICLE_BUCKET  = os.getenv('AWS_S3_ARTICLE_BUCKET', 'dev.publiceditor.io')
AWS_S3_ARTICLE_PREFIX  = os.getenv('AWS_S3_ARTICLE_PREFIX', 'articles/')

localFilePathAndName = sys.argv[1]
filename = sys.argv[2]
print("in s3-put.py ")
print("sending " + localFilePathAndName)
print ("to " + AWS_S3_ARTICLE_PREFIX + filename)

result = boto3.client('s3').upload_file(localFilePathAndName, AWS_S3_ARTICLE_BUCKET, AWS_S3_ARTICLE_PREFIX + filename)

print("s3-put.py finished")
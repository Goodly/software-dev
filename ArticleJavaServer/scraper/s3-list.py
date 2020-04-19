#!/usr/bin/python3
import boto3
import json

s3client = boto3.client('s3')

result = s3client.list_objects(
  Bucket = 'dev.publiceditor.io'
)

f = json.dumps(result, indent=2, default=str)
print (f)

print('done')
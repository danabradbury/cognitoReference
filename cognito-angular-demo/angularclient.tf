provider "aws" {
  region = "us-east-1"
}

resource "aws_s3_bucket" "angular_app_bucket" {
  bucket = "angular-cognito-demo-bucket"
  force_destroy = true
}

# Set the ACL in a separate resource
resource "aws_s3_bucket_acl" "angular_app_bucket_acl" {
  bucket = aws_s3_bucket.angular_app_bucket.id
  acl    = "public-read"
}

# Separate website config
resource "aws_s3_bucket_website_configuration" "angular_app_bucket_website_config" {
  bucket = aws_s3_bucket.angular_app_bucket.bucket

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "index.html"
  }
}

resource "aws_s3_bucket_policy" "angular_app_policy" {
  bucket = aws_s3_bucket.angular_app_bucket.id
  policy = data.aws_iam_policy_document.allow_s3_public_access.json
}

data "aws_iam_policy_document" "allow_s3_public_access" {
  statement {
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.angular_app_bucket.arn}/*"]
    principals {
      type        = "AWS"
      identifiers = ["*"]
    }
  }
}

resource "null_resource" "build_and_upload" {
  provisioner "local-exec" {
    command = "npm install && npm run build"
  }

  provisioner "local-exec" {
    command = "aws s3 sync dist/ s3://${aws_s3_bucket.angular_app_bucket.bucket}"
  }

  depends_on = [aws_s3_bucket.angular_app_bucket]
}
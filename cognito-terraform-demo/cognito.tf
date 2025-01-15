# main.tf

terraform {
  required_version = "~> 1.7"

  required_providers {
    aws = {
      version = "~> 5.0"
      source  = "hashicorp/aws"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

# 1) Create a Cognito User Pool
resource "aws_cognito_user_pool" "demo_pool" {
  name                = var.aws_cognito_user_pool_name
  username_attributes = ["email"]

  # disable MFA
  mfa_configuration = "OFF"
}

# 2) Create Google federated Identity provider
resource "aws_cognito_identity_provider" "google_provider" {
  user_pool_id = aws_cognito_user_pool.demo_pool.id
  provider_name = "Google"
  provider_type = "Google"
  provider_details = {
    client_id     = var.google_client_id
    client_secret = var.google_client_secret
    authorize_scopes = "openid email profile"
  }
  attribute_mapping = {
    email = "email"
  }
}


# 3) Create a User Pool Client
resource "aws_cognito_user_pool_client" "demo_pool_client" {
  name         = var.aws_cognito_user_pool_client_name
  user_pool_id = aws_cognito_user_pool.demo_pool.id

  
  # If you plan to use OAuth flows:
  allowed_oauth_flows       = ["code"]
  allowed_oauth_scopes      = ["openid", "email", "profile"]
  callback_urls             = var.client_callback_urls
  logout_urls               = var.client_logout_urls
  supported_identity_providers = ["COGNITO", "Google"] 

  # Enable PKCE if you want the secure code flow for SPAs
  allowed_oauth_flows_user_pool_client = true

  # Optional: If you need refresh tokens for an SPA
  refresh_token_validity = 30 # in days

  depends_on = [aws_cognito_identity_provider.google_provider]
}



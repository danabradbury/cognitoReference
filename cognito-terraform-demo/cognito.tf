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

# 3) Create an OIDC identity provider using varsity EID
resource "aws_cognito_identity_provider" "varsity_provider" {
  user_pool_id = aws_cognito_user_pool.demo_pool.id
  provider_name = "VarsityOIDC"
  provider_type = "OIDC"
  provider_details = {
    client_id     = var.varsity_oidc_client_id
    client_secret = var.varsity_oidc_client_secret
    authorize_scopes = "openid email profile"
    oidc_issuer = "https://login.microsoftonline.com/c94c2e0f-055b-4d4d-804c-286d873b70ce/v2.0"
    attributes_request_method = "GET"
  }
  attribute_mapping = {
    email = "email"
  }
}

# 4) we need a domian to provide a hosted login screen
# in a real case we'd use a custom domain, but for the POC we can use a generated AWS domain
resource "aws_cognito_user_pool_domain" "main" {
  domain       = "varsity-oath-demo-domain"
  user_pool_id = aws_cognito_user_pool.demo_pool.id
}

# 5) Create a User Pool Client
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



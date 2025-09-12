pipeline {
    agent any
    environment {
        AWS_CREDENTIALS = credentials('aws-id')  // Jenkins AWS credentials
        ECR_REPO = '123456789012.dkr.ecr.us-east-1.amazonaws.com/myapp'
        IMAGE_TAG = "${env.BUILD_NUMBER}"      // unique image tag per build
        EC2_USER = 'ec2-user'
        EC2_HOST = '<EC2-IP>'                  // replace with your EC2 IP
    }
    stages {
        stage('Checkout') {
            steps {
                git branch: 'dev', url: 'https://github.com/<your-repo>.git'
            }
        }

        stage('Build & Test') {
            steps {
                sh 'npm install'
                sh 'npm test'
            }
        }

        stage('Docker Build') {
            steps {
                sh "docker build -t myapp:${IMAGE_TAG} ."
            }
        }

        stage('Push to ECR') {
            steps {
                withAWS(credentials: 'aws-id', region: 'us-east-1') {
                    sh '''
                    aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 123456789012.dkr.ecr.us-east-1.amazonaws.com
                    docker tag myapp:${IMAGE_TAG} $ECR_REPO:${IMAGE_TAG}
                    docker push $ECR_REPO:${IMAGE_TAG}
                    '''
                }
            }
        }

        stage('Deploy on EC2') {
            steps {
                sh """
                ssh -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_HOST} '
                    docker pull $ECR_REPO:${IMAGE_TAG} &&
                    docker stop myapp || true &&
                    docker rm myapp || true &&
                    docker run -d --name myapp -p 80:3000 $ECR_REPO:${IMAGE_TAG}
                '
                """
            }
        }
    }

    post {
        success {
            echo "Deployment successful! Running version: ${IMAGE_TAG}"
        }
        failure {
            echo "Deployment failed! Check logs."
        }
    }
}

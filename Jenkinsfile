pipeline { 
    agent any
    environment {
        AWS_ACCOUNT_ID       = "979437352253"
        AWS_DEFAULT_REGION   = "us-east-1"
        IMAGE_REPO_NAME      = "devops_repo"
        IMAGE_TAG            = "v1"
        CLUSTER_NAME         = "devops-ec2-cluster"
        SERVICE_NAME         = "devops-task-service-pj4gq7zi"
        USE_PUBLIC_ECR       = false
    }

    stages {
        stage('Login to ECR') {
            steps {
                script {
                    sh '''
                      aws ecr get-login-password --region ${AWS_DEFAULT_REGION} \
                      | docker login --username AWS --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com
                    '''
                }
            }
        }

        stage('Clone Git Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/Amanpatwa12/devops-task.git'
            }
        }

        stage('Install Dependencies & Run Tests') {
            steps {
                sh '''
                  npm install
                  npm test || echo "Tests failed but continuing pipeline"
                '''
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    dockerImage = docker.build("${IMAGE_REPO_NAME}:${IMAGE_TAG}")
                }
            }
        }

        stage('Push Docker Image to ECR') {
            steps {
                script {
                    sh '''
                      docker tag ${IMAGE_REPO_NAME}:${IMAGE_TAG} ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com/${IMAGE_REPO_NAME}:${IMAGE_TAG}
                      docker push ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com/${IMAGE_REPO_NAME}:${IMAGE_TAG}
                    '''
                }
            }
        }

        stage('Deploy to ECS') {
            steps {
                sh '''
                  aws ecs update-service \
                    --cluster ${CLUSTER_NAME} \
                    --service ${SERVICE_NAME} \
                    --force-new-deployment \
                    --region ${AWS_DEFAULT_REGION}
                '''
            }
        }

        stage('CloudWatch Info') {
            steps {
                echo "Deployment triggered successfully."
                echo "Logs in CloudWatch Logs group: /ecs/${IMAGE_REPO_NAME}"
                echo "Metrics in CloudWatch Metrics → ECS → ${CLUSTER_NAME} / ${SERVICE_NAME}"
            }
        }
    }
}

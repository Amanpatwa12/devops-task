pipeline {
    agent any
    stages {
        stage('checkout')
            steps {
                checkout scm
            }
    }
    stages {
        stage('Build and Test')
            steps {
                sh 'npm install'
                sh 'npm test'
            }
    }
    stages {
        stage('Docker Build')
            steps {
                sh 'docker build -t devops-task'
            }
    }
    stages {
        stage('Build and Test')
            steps {
                sh 'npm install'
                sh 'npm test'
            }
    }


}
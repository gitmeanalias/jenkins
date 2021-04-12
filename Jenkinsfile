pipeline {
    agent { label 'master' }
       
    stages {
        stage('Cloning Git repo...') {
            steps {
                checkout([$class: 'GitSCM',
                branches: [[name: 'main']],
                doGenerateSubmoduleConfigurations: false,
                extensions: [],
                submoduleCfg: [],
                userRemoteConfigs: [[url: 'https://github.com/gitmeanalias/jenkins.git']]])
            }
        }
        
        stage('Logging to AWS...') {
            steps {
                withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', accessKeyVariable: 'AWS_ACCESS_KEY_ID', credentialsId: 'aws', secretKeyVariable: 'AWS_SECRET_ACCESS_KEY']]) {
                    sh "aws ecr get-login-password --region us-east-2 | docker login --username AWS --password-stdin ${env.ECR_URL}" 
                } 
            }
        }
        
        stage('Pushing Docker image to AWS ECR...') {
            steps {
                sh 'docker build -t first-repo:latest .'
                sh "docker tag first-repo:latest ${env.ECR_URL}/first-repo:latest"
                sh "docker push ${env.ECR_URL}/first-repo:latest"
            }
        }
        
        stage('Cleaning Docker containers...') {
            agent { label 'slave' }
            steps {
                sh 'docker ps -f name=first-repo -q | xargs --no-run-if-empty docker system prune'
                sh 'docker ps | docker images'
            }
        }
                
        stage('Running Docker container...') {
            agent { label 'slave' }
            
            steps {
                withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', accessKeyVariable: 'AWS_ACCESS_KEY_ID', credentialsId: 'aws', secretKeyVariable: 'AWS_SECRET_ACCESS_KEY']]) {
                    sh "aws ecr get-login-password --region us-east-2 | docker login --username AWS --password-stdin ${env.ECR_URL}"
                    sh "docker run -d -p 80:3000 --rm --name first-repo ${env.ECR_URL}/first-repo:latest"
             }
            }
        }
    }
}

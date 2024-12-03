pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub_login')
        GITHUB_CREDENTIALS = credentials('github_login')
        GITHUB_TOKEN = credentials('github_token')
        DOCKERHUB_REPO = 'mad1011/query-exporter-app'
    }

    stages {
        // stage('SonarCloud analysis') {
        //     environment {
        //         scannerHome = tool 'Sonarqube scanner'
        //     }

        //     steps {
        //         withSonarQubeEnv(credentialsId: 'sonarcloud_token', installationName: 'SonarCloud') {
        //             powershell """
        //                 ${scannerHome}\\bin\\sonar-scanner.bat `
        //                     -D"sonar.organization=hadam1011" `
        //                     -D"sonar.projectKey=hadam1011_Query-exporter-app-FE2" `
        //                     -D"sonar.sources=./src" `
        //                     -D"sonar.host.url=https://sonarcloud.io"
        //             """
        //         }
        //     }
        // }

        // stage ('Clone project') {
        //     steps {
        //         git branch: 'main', url: 'https://github.com/hadam1011/Query-exporter-app-FE.git'
        //     }
        // }

        stage ('Build') {
            steps {
                // Build image
                bat "docker build -t ${DOCKERHUB_REPO}:frontend-${BUILD_NUMBER} ."
                
                // Push image to Docker Hub
                bat """
                    docker login -u ${DOCKERHUB_CREDENTIALS_USR} -p ${DOCKERHUB_CREDENTIALS_PSW}
                    docker push ${DOCKERHUB_REPO}:frontend-${BUILD_NUMBER}
                """
            }
        }

        stage ('Deploy') {
            steps {
                bat """
                    git config user.email "hadam8910@gmail.com"
                    git config user.name "hadam1011"
                    powershell -Command "(Get-Content deployments/frontend-deployment.yaml) -replace 'imageVersion', ${BUILD_NUMBER} | Out-File -encoding ASCII deployments/frontend-deployment.yaml"
                    
                    git clone https://github.com/hadam1011/manifests.git
                    copy deployments\\frontend-deployment.yaml manifests\\query-exporter-app\\frontend-deployment.yaml

                    cd manifests
                    git config user.email "hadam8910@gmail.com"
                    git config user.name "hadam1011"
                    git add .
                    git commit -m "Update frontend deployment image to version ${BUILD_NUMBER}"
                    git push https://${GITHUB_TOKEN}@github.com/hadam1011/manifests

                    cd ..
                    rmdir /s /q manifests
                """
            }
        }
    }
    post {
        success {
            bat """
                Invoke-WebRequest -Uri "https://api.telegram.org/bot7932959424:AAEfe8M7DCJ9G0-r5nx9ze8sEQvcIGwtUp0/sendMessage" -Method POST -ContentType "application/json" -Body '{"chat_id": "6238565642", "text": "Pipeline run successfully!", "disable_notification": false}' -UseBasicParsing
            """
        }
        failure {
            bat """
                Invoke-WebRequest -Uri "https://api.telegram.org/bot7932959424:AAEfe8M7DCJ9G0-r5nx9ze8sEQvcIGwtUp0/sendMessage" -Method POST -ContentType "application/json" -Body '{"chat_id": "6238565642", "text": "Pipeline has failed!", "disable_notification": false}' -UseBasicParsing
            """
        }
    }
}
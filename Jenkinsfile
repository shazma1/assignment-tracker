pipeline {
    agent any

    stages {

        stage('Clone App Repository') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/shazma1/assignment-tracker.git'
            }
        }

        stage('Start App') {
            steps {
                sh 'docker-compose -f $WORKSPACE/docker-compose-part2.yml down || true'
                sh 'docker-compose -f $WORKSPACE/docker-compose-part2.yml up -d'
                sh 'sleep 15'
            }
        }

        stage('Clone Test Repository') {
            steps {
                dir('selenium-tests') {
                    git branch: 'main',
                        url: 'https://github.com/shazma1/selenium-tests.git'
                }
            }
        }

        stage('Run Selenium Tests') {
            steps {
                sh '''
                    docker run --rm \
                        --network host \
                        -v $WORKSPACE/selenium-tests:/workspace \
                        -w /workspace \
                        markhobson/maven-chrome:jdk-21 \
                        mvn test
                '''
            }
        }

        stage('Stop App') {
            steps {
                sh 'docker-compose -f $WORKSPACE/docker-compose-part2.yml down || true'
            }
        }
    }

    post {
        always {
            junit allowEmptyResults: true,
                  testResults: 'selenium-tests/target/surefire-reports/*.xml'

            emailext (
                subject: "Jenkins Build ${currentBuild.fullDisplayName} - ${currentBuild.currentResult}",
                body: """
                    <h2>Jenkins Pipeline Report</h2>
                    <p><b>Project:</b> ${env.JOB_NAME}</p>
                    <p><b>Build Number:</b> ${env.BUILD_NUMBER}</p>
                    <p><b>Status:</b> ${currentBuild.currentResult}</p>
                    <p><b>Duration:</b> ${currentBuild.durationString}</p>
                    <p><b>Build URL:</b> <a href="${env.BUILD_URL}">${env.BUILD_URL}</a></p>
                    <p><b>Test Report:</b> <a href="${env.BUILD_URL}testReport">${env.BUILD_URL}testReport</a></p>
                """,
                mimeType: 'text/html',
                recipientProviders: [[$class: 'RequesterRecipientProvider'],
                                     [$class: 'CulpritsRecipientProvider']],
                to: 'qasimalik@gmail.com'
            )
        }
        success {
            echo 'All tests passed!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}

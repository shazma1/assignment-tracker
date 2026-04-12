pipeline {
    agent any

    stages {

        stage('Clone Repository') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/shazma1/assignment-tracker.git'
            }
        }

        stage('Build') {
            steps {
                sh 'docker-compose -f $WORKSPACE/docker-compose-part2.yml up -d'
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully! App is running.'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}

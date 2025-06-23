// pipeline {
//     agent any

//     stages {
//         stage('Install dependencies') {
//             steps {
//                 sh 'cd frontend && npm ci'
//                 sh 'cd backend && npm ci'
//             }
//         }
//         stage('Build frontend') {
//             steps {
//                 sh 'cd frontend && npm run build'
//             }
//         }
//         stage('Build backend') {
//             steps {
//                 sh 'cd backend && npm run build'
//             }
//         }
//         stage('Test') {
//             steps {
//                 sh 'cd frontend && npm test'
//                 sh 'cd backend && npm test'
//             }
//         }
//     }
// }


pipeline {
    agent any

    environment {
        NODE_ENV = 'development'
    }

    tools {
        nodejs 'node24' // เปลี่ยนชื่อให้ตรงกับ Jenkins
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/VoyagerXIII/prj-test-01.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            when {
                expression { fileExists('package.json') && sh(script: "npm run | grep build", returnStatus: true) == 0 }
            }
            steps {
                sh 'npm run build'
            }
        }

        stage('Deploy to VPS') {
            when {
                branch 'master'
            }
            steps {
                sshagent(credentials: ['vps-key']) {
                    sh """
                        echo "📦 Copying files to VPS..."
                        scp -r * root@203.159.95.168:/home/qler/prj-test-01

                        echo "✅ Deployed to VPS successfully."
                    """
                }
            }
        }
    }

    post {
        success {
            echo '🎉 Pipeline completed successfully!'
        }
        failure {
            echo '💥 Pipeline failed!'
        }
    }
}

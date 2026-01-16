/**
 * Setup Verification Script
 * Checks if all required files and configurations are in place
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying Team Directory Project Setup...\n');

const checks = [
    {
        name: 'React Source Files',
        files: [
            'src/App.jsx',
            'src/App.css',
            'src/main.jsx',
            'src/index.css'
        ]
    },
    {
        name: 'ColdFusion API Files',
        files: [
            'api/employees.cfc',
            'api/employees_alternative.cfc'
        ]
    },
    {
        name: 'Database Scripts',
        files: [
            'database/setup.sql',
            'database/init_database.py',
            'database/init_database.js'
        ]
    },
    {
        name: 'Configuration Files',
        files: [
            'package.json',
            'vite.config.js',
            'index.html'
        ]
    },
    {
        name: 'Documentation',
        files: [
            'README.md',
            'SETUP_GUIDE.md',
            'PROJECT_SUMMARY.md'
        ]
    }
];

let allPassed = true;

checks.forEach(check => {
    console.log(`\n📁 ${check.name}:`);
    check.files.forEach(file => {
        const exists = fs.existsSync(file);
        const status = exists ? '✅' : '❌';
        console.log(`   ${status} ${file}`);
        if (!exists) allPassed = false;
    });
});

// Check if database exists (optional)
const dbPath = 'database/team_directory.db';
const dbExists = fs.existsSync(dbPath);
console.log(`\n💾 Database:`);
console.log(`   ${dbExists ? '✅' : '⚠️ '} ${dbPath} ${dbExists ? '(exists)' : '(will be created during setup)'}`);

// Summary
console.log('\n' + '='.repeat(50));
if (allPassed) {
    console.log('✅ All required files are present!');
    console.log('\n📋 Next Steps:');
    console.log('   1. Run: python database/init_database.py');
    console.log('   2. Configure ColdFusion datasource');
    console.log('   3. Deploy API files to ColdFusion web root');
    console.log('   4. Run: npm install');
    console.log('   5. Run: npm run dev');
} else {
    console.log('❌ Some files are missing. Please check the errors above.');
}
console.log('='.repeat(50));

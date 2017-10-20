'use strict'
const chalk = require('chalk')
const db = require('./_db')
const { Campus, Students } = require('./models')

db.sync({force: true})
    .then(() => {
        console.log(chalk.bgWhite.black('db synced'))
    })
    .then(() => {
        return Campus.bulkCreate([
            { name: 'Blood Gultch', 
            address: '641 Avenue of Americas New York New York 10011',
            image: '/bloodgulch_bluebase.jpg',
            managerEmail: 'halsey@unsc.gov' },
            { name: 'Beaver Creek', 
            address: '200 E Randolph St Ste 200 Chicago IL 60601',
            image: '/beavercreek_redbase.jpg',
            managerEmail: 'johnson@unsc.gov' },
            { name: 'Prison', 
            address: '434 Kirkland Ave Kirkland WA 98033',
            image: '/prison_center.jpg',
            managerEmail: 'keyes@unsc.gov' }
        ])
    })
    .then(() => {
        console.log(chalk.blue('Campuses created'))
    })
    .then(() => {
        return Students.bulkCreate([
            { name: 'Jacob Keyes', address: '123 6th St Melbourne FL 32904', email: 'Jacob@unsc.gov', image: '/cortana.png', CampusId: 1 },
            { name: 'Holly Tanaka', address: '4 Goldfield Rd Honolulu HI 96815', email: 'Holly@unsc.gov', image: '/man.jpg', CampusId: 1 },
            { name: 'Veronica Dare', address: '71 Pilgrim Avenue Chevy Chase MD 20815', email: 'veronica@unsc.gov', image: '/man.jpg', CampusId: 1 },
            { name: 'Manuel Mendoza', address: '44 Shirley Ave West Chicago IL 60185', email: 'manuel@unsc.gov', image: '/johnson.png', CampusId: 1 },
            { name: 'Marcus Stacker', address: '514 S. Magnolia St Orlando FL 32806', email: 'marcus@unsc.gov', image: '/man.jpg', CampusId: 1 },
            { name: 'Chips Dubbo', address: '70 Bowman St South Windsor CT 06074', email: 'chips@unsc.gov', image: '/cortana.png', CampusId: 2 },
            { name: 'M. Fitzgerald', address: '970 N. Devon Dr Warwick RI 02886', email: 'm@unsc.gov', image: '/johnson.png', CampusId: 2 },
            { name: 'Carol "Foehammer" Rawley', address: '8269 Van Dyke Drive Bradenton FL 34203', email: 'carol@unsc.gov', image: '/cortana.png', CampusId: 2 },
            { name: 'Kojo Agu', address: '8269 Van Dyke Drive Bradenton FL 34203', email: 'kojo@unsc.gov', image: '/man.jpg', CampusId: 2 },
            { name: 'Michael Crespo', address: '38 Race Rd Asheville NC 28803', email: 'michael@unsc.gov', image: '/cortana.png', CampusId: 3 },
            { name: 'Avery Johnson', address: '7768 Inverness Drive Oxford MS 38655', email: 'avery@unsc.gov', image: '/man.jpg', CampusId: 3 },
            { name: 'Sarah Palmer', address: '6 Oakwood Street Phillipsburg NJ 08865', email: 'sarah@unsc.gov', image: '/johnson.png', CampusId: 3 },
            { name: 'Usze Taham', address: '25 North Indian Spring Lane Mooresville NC 28115', email: 'usze@unsc.gov', image: '/cortana.png', CampusId: 3 },
            { name: 'Wallace Jenkins', address: '50 Bridgeton St. Apopka FL 32703', email: 'wallace@unsc.gov', image: '/man.jpg', CampusId: 3 },
        ])
    })
    .then(() => {
        return console.log(chalk.green('Students created'))
    })
    .then(() => {
        console.log(chalk.bgWhite.black('seeding complete'))
        db.close()
    })
    .catch(console.error)
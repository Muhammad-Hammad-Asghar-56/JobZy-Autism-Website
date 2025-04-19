const request = require('supertest');
const chai = require('chai');
const app = require('../index'); // Import the app
const expect = chai.expect;

describe('Employer Routes', () => {
    let sessionToken = ''; // Store the session token for authenticated requests
    let employer = {
        companyName: 'Tech Solutions',
        contactName: 'Jane Doe',
        position: 'HR Manager',
        email: 'jane.doe@techsol.com',
        phoneNumber: '1234567890',
        industry: 'Technology',
        password: 'testPassword123',
        termsAccepted: true,
    };

    before(async () => {
        try {
            // Pre-cleanup: Delete the employer if exists before the test suite starts
            const res = await request(app)
                .delete('/api/employer/')
                .send({
                    email: employer.email,
                    password: employer.password,
                });

            // Check if deletion was successful, or if the employer wasn't found
            if (res.status === 404) {
                console.log('Employer not found, skipping deletion.');
            } else if (res.status === 200) {
                console.log('Employer deleted successfully');
            }

        } catch (err) {
            throw err;  // Throw error to ensure Mocha handles it properly
        }
    });


    // Test Employer Registration
    it('should register a new employer', (done) => {
        request(app)
            .post('/api/employer/register')
            .send(employer)
            .expect([201, 404])
            .end((err, res) => {
                if (err) return done(err);
                if (res.body.message === 'Employer registered successfully') {
                    expect(res.body.user.companyName).to.equal('Tech Solutions');
                } else if (res.body.message === 'Employer already exists') {
                    // Handle the case where employer already exists
                    // (if needed, such as checking the error handling)
                    expect(res.body.message).to.equal('Employer already exists');
                }
                done();
            });
    });

    // Test Employer Login
    it('should log in an employer', (done) => {
        request(app)
            .post('/api/employer/login')
            .send({
                email: employer.email,
                password: employer.password,
            })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);

                // Save the session token (employerId) from the cookie
                const cookies = res.headers['set-cookie'];
                sessionToken = cookies
                    .find(cookie => cookie.startsWith('connect.sid'))
                    .split(';')[0]
                    .split('=')[1];

                // Ensure login was successful
                expect(res.body.message).to.equal('Logged in successfully');
                done();
            });
    });

    // Test Employer Profile Update
    it('should update the employer profile', (done) => {
        const updatedProfile = {
            fieldToEdit: 'contactName',
            obj: 'John Doe',
        };

        request(app)
            .put('/api/employer')
            .set('Cookie', `connect.sid=${sessionToken}`)
            .send(updatedProfile)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);

                // Check if the profile was updated
                expect(res.body.message).to.equal('Employer updated successfully');
                expect(res.body.user.contactName).to.equal('John Doe');
                done();
            });
    });

    // Test Add Jobs to Employer Profile
    it('should add jobs to the employer profile', (done) => {
        const jobs = [
            {
                title: 'Software Engineer',
                description: 'Develop software applications',
                location: 'New York, USA',
                salary: '100000',
                requirements: '5+ years of experience',
                jobType: 'Full-time',
            },
        ];

        request(app)
            .put('/api/employer')
            .set('Cookie', `connect.sid=${sessionToken}`)
            .send({
                fieldToEdit: 'jobs',
                obj: jobs,
            })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);

                // Check if the jobs were added successfully
                expect(res.body.message).to.equal('Employer updated successfully');
                expect(res.body.user.jobs).to.have.lengthOf(1);
                done();
            });
    });


    // Test Employer Logout
    // it('should log out the employer', (done) => {
    //     request(app)
    //         .post('/api/employer/logout')
    //         .set('Cookie', `connect.sid=${sessionToken}`)
    //         .expect(200)
    //         .end((err, res) => {
    //             if (err) return done(err);

    //             // Ensure logout was successful
    //             expect(res.body.message).to.equal('Logged out successfully');
    //             done();
    //         });
    // });
});

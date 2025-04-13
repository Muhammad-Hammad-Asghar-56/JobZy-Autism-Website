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

    before((done) => {
        // Pre-cleanup: Delete the employer if exists before the test suite starts
        request(app)
            .delete('/api/employer/')
            .send({
                email: employer.email,
                password: employer.password,
            })
            .expect(200)
            .end(done);
    });

    // Test Employer Registration
    it('should register a new employer', (done) => {
        request(app)
            .post('/api/employer/register')
            .send(employer)
            .expect(201)
            .end((err, res) => {
                if (err) return done(err);

                // Check if employer was successfully registered
                expect(res.body.message).to.equal('Employer registered successfully');
                expect(res.body.user.companyName).to.equal('Tech Solutions');
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

    // Test Get Employer Profile
    it('should get an employer profile', (done) => {
        request(app)
            .get(`/api/employer/${employer.email}`)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);

                // Check if the employer profile is returned correctly
                expect(res.body.message).to.equal('success');
                expect(res.body.user.companyName).to.equal('Tech Solutions');
                done();
            });
    });

    // Test Employer Logout
    it('should log out the employer', (done) => {
        request(app)
            .post('/api/employer/logout')
            .set('Cookie', `connect.sid=${sessionToken}`)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);

                // Ensure logout was successful
                expect(res.body.message).to.equal('Logged out successfully');
                done();
            });
    });
});

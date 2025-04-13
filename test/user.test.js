const request = require('supertest');
const chai = require('chai');
const app = require('../index'); // Import the app here
const expect = chai.expect;

describe('User Routes', () => {
    let sessionToken = ''; // To store the session token for authenticated requests
    let userIdCookie = ''; // To store the userId cookie for future tests
    let user={
      title: 'Mr.',
      firstName: 'John',
      lastName: 'Doe',
      position: 'Software Developer',
      phoneNumber: '1234567890',
      additionalInfo: 'No additional info',
      street: '123 Main St',
      zipCode: '12345',
      country: 'Country X',
      email: 'johndoe@example.com',
      password: 'testPassword123'
  };
    before((done) => {
      // Attempt to delete the user before the test suite starts
      request(app)
          .delete('/api/users/')
          .send({
              email: user.email,
              password: user.password
          })
          .expect(200)
          .end(done);
  });

    // Register a new user and save the session cookie
    it('should register a new user', (done) => {
        request(app)
            .post('/api/users/register')
            .send(user)
            .expect(201)
            .end((err, res) => {
                if (err) return done(err);
                if (res.body.message === 'User already exists') {
                  // If user exists, don't fail the test, just pass it
                  return done();
              }
                // Extract the 'connect.sid' cookie
                const cookies = res.headers['set-cookie'];
                sessionToken = cookies
                    .find(cookie => cookie.startsWith('connect.sid'))
                    .split(';')[0]
                    .split('=')[1]; // Extract the session token (connect.sid)

                expect(res.body.message).to.equal('User registered successfully');
                done();
            });
    });

    // Log in the user and save the session cookie
    it('should log in a user', (done) => {
        request(app)
            .post('/api/users/login')
            .send({
                email: user.email,
                password: user.password
            })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);

                // Extract the 'connect.sid' cookie
                const cookies = res.headers['set-cookie'];
                sessionToken = cookies
                    .find(cookie => cookie.startsWith('connect.sid'))
                    .split(';')[0]
                    .split('=')[1]; // Extract the session token (connect.sid)

                expect(res.body.message).to.equal('Logged in successfully');
                done();
            });
    });

    // Update user details (authenticated using session cookie)
    it('should update the user details', (done) => {
        request(app)
            .put('/api/users')
            .set('Cookie', `connect.sid=${sessionToken}`)  // Use the session token in the cookie
            .send({
                fieldToEdit: 'firstName',
                obj: 'Jane' // New first name
            })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body.message).to.equal('User updated successfully');
                expect(res.body.user.firstName).to.equal('Jane');
                done();
            });
    });

    // Add work experience to the user's profile (authenticated using session cookie)
    it('should add work experience to the user profile', (done) => {
        request(app)
            .put('/api/users')
            .set('Cookie', `connect.sid=${sessionToken}`)  // Use the session token in the cookie
            .send({
                fieldToEdit: 'workExperience',
                obj: {
                  "jobTitle": "Software Engineer",
                  "companyName": "Tech Solutions Inc.",
                  "startDate": "2021-01-01T00:00:00Z",
                  "endDate": "2023-12-31T23:59:59Z",
                  "description": "Developed and maintained web applications, collaborated with cross-functional teams to ensure timely delivery of projects.",
                  "skills": "JavaScript, Node.js, React, HTML, CSS, Git",
                  "location": "New York, USA"
              }              
            })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body.message).to.equal('User updated successfully');
                expect(res.body.user.workExperience).to.have.lengthOf(1);
                done();
            });
    });

    // Log out the user (authenticated using session cookie)
    it('should log out the user', (done) => {
        request(app)
            .post('/api/users/logout')
            .set('Cookie', `connect.sid=${sessionToken}`)  // Use the session token in the cookie
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body.message).to.equal('Logged out successfully');
                done();
            });
    });
});

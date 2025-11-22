const Job = require('../models/Job');

// Create a new job
exports.createJob = async (req, res) => {
  try {
    const { companyName, jobTitle, description, salary } = req.body;

    // Validate required fields
    if (!companyName || !jobTitle || !description || salary === undefined) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // Validate salary is a positive number
    if (isNaN(salary) || salary < 0) {
      return res.status(400).json({ error: 'Salary must be a positive number.' });
    }

    // Create new job
    const job = new Job({
      companyName,
      jobTitle,
      description,
      salary: Number(salary)
    });

    await job.save();

    res.status(201).json({ 
      message: 'Job created successfully.',
      job: {
        id: job._id,
        companyName: job.companyName,
        jobTitle: job.jobTitle,
        description: job.description,
        salary: job.salary,
        createdAt: job.createdAt
      }
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: 'Validation failed.' });
    }
    console.error('Create job error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

// Get all jobs
exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find({}).sort({ createdAt: -1 });

    const jobsList = jobs.map(job => ({
      id: job._id,
      companyName: job.companyName,
      jobTitle: job.jobTitle,
      description: job.description,
      salary: job.salary,
      createdAt: job.createdAt
    }));

    res.status(200).json({ jobs: jobsList });
  } catch (error) {
    console.error('Get jobs error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

const Job = require("../models/Job");

// CREATE JOB
exports.createJob = async (req, res) => {
    try {

        // Find highest existing jobId
        const lastJob = await Job.findOne({})
            .sort({ jobId: -1 });

        const nextJobId = lastJob && lastJob.jobId
            ? lastJob.jobId + 1
            : 1;

        console.log("Creating job with jobId =", nextJobId);

        const job = new Job({
            title: req.body.title,
            company: req.body.company,
            location: req.body.location,
            description: req.body.description,
            salary: req.body.salary,
            skills: req.body.skills,
            jobId: nextJobId
        });

        await job.save();

        res.status(201).json(job);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: error.message
        });

    }
};

// GET ALL JOBS
exports.getJobs = async (req, res) => {
    try {

        const jobs = await Job.find().sort({ createdAt: -1 });

        res.json(jobs);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// GET SINGLE JOB
exports.getJobById = async (req, res) => {
    try {

        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({
                message: "Job not found"
            });
        }

        res.json(job);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// UPDATE JOB
exports.updateJob = async (req, res) => {
    try {

        const job = await Job.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(job);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// DELETE JOB
exports.deleteJob = async (req, res) => {
    try {

        await Job.findByIdAndDelete(req.params.id);

        res.json({
            message: "Job deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};
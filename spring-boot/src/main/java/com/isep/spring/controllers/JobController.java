 package com.isep.spring.controllers;

        import com.isep.spring.models.Job;
        import com.isep.spring.repository.JobRepository;
        import lombok.RequiredArgsConstructor;
        import org.springframework.beans.factory.annotation.Autowired;
        import org.springframework.http.HttpStatus;
        import org.springframework.http.ResponseEntity;
        import org.springframework.web.bind.annotation.*;

        import java.util.List;
        import java.util.Optional;

@CrossOrigin(origins = "http://localhost:8081", maxAge = 3600)
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/")
public class JobController {

    @Autowired
    JobRepository jobRepository;


    @GetMapping("job")
    public ResponseEntity<List<Job>> getAllJob() {
        return ResponseEntity.ok(jobRepository.findAll());
    }

    @GetMapping("job/{id}")
    public ResponseEntity getJobById(@PathVariable Long id) {
        return jobRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @DeleteMapping("job/{id}")
    public ResponseEntity deleteJobById(@PathVariable Long id) {
        jobRepository.deleteById(id);
        return ResponseEntity.status(HttpStatus.ACCEPTED).build();
    }

    @PostMapping(path = "job")
    public ResponseEntity<Job> addJob(@RequestBody Job job) {
        var saveJob = jobRepository.save(job);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(saveJob);
    }

    @PutMapping(path = "job/{id}")
    public ResponseEntity updateJobById(@RequestBody Job job, @PathVariable Long id) {
        Optional<Job> optionalJob = jobRepository.findById(id);
        if (optionalJob.isPresent()) {
            Job _job = optionalJob.get();
            _job.setJobDescription(job.getJobDescription());
            _job.setJobName(job.getJobName());

            return ResponseEntity.status(HttpStatus.ACCEPTED).body(jobRepository.save(_job));
        } else return ResponseEntity.status(HttpStatus.NOT_FOUND).build();

    }

}

# Execute BASE PRP

Implement a feature using using the PRP file follow this system prompt `docs/system-prompt.md`

## PRP File: $ARGUMENTS

## Execution Process

1. **Load PRP**
   - Read the specified PRP file
   - Understand all context and requirements
   - Follow all instructions in the PRP and extend the research if needed
   - Ensure you have all needed context to implement the PRP fully
   - Do more web searches and codebase exploration as needed

2. **ULTRATHINK**
   - Think hard before you execute the plan. Create a comprehensive plan addressing all requirements.
   - Break down complex tasks into smaller, manageable steps using your todos tools.
   - Use the TodoWrite tool to create and track your implementation plan.
   - Identify implementation patterns from existing code to follow.

3. **Execute the plan**
   - Execute the PRP
   - Implement all the code

4. **Validate & Auto-Recover**
   - Run each validation command
   - If failures occur:
     * Analyze error patterns from PRP
     * Apply smart fixes using similar code patterns
     * Re-run validation (max 3 attempts per issue)
     * If still failing, escalate with detailed analysis

5. **Complete**
   - Ensure all checklist items done
   - Run final validation suite
   - Report completion status
   - Read the PRP again to ensure you have implemented everything

6. **Reference the PRP**
   - You can always reference the PRP again if needed

## Auto-Recovery Strategy

### Validation Failure Handling
1. **First Failure**: Check PRP error patterns, apply documented fixes
2. **Second Failure**: Analyze error output, search codebase for similar solutions
3. **Third Failure**: Reduce implementation scope or request human guidance

### Context Optimization
- If implementation is taking too long, check PRP complexity assessment
- Consider breaking down into smaller phases
- Use quick-implement approach for simple components

### Smart Error Analysis
- Parse validation output for specific error types
- Match against common failure patterns in PRP
- Apply fixes incrementally and test each change
- Document new error patterns discovered

Note: Maximum 3 attempts per validation issue before escalation.
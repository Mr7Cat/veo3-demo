# Quick Implement

## Feature file: $ARGUMENTS

**Purpose**: Fast-track implementation for simple to medium complexity features without full PRP generation. Ideal for straightforward implementations that don't require extensive planning.

## When to Use Quick Implement vs Full PRP

### Use Quick Implement for:
- Single file or small module implementations
- Clear, well-defined features with obvious implementation path
- Features similar to existing patterns in codebase
- Simple API integrations or utility functions
- Small UI components or widgets

### Use Full PRP Workflow for:
- Multi-file, complex system implementations
- Features requiring significant architectural decisions
- New patterns not seen in codebase
- Features with complex integration requirements
- Performance-critical or security-sensitive implementations

## Implementation Process

### 1. **Rapid Analysis**
   - Read the feature request from INITIAL.md or specified file
   - Quick scan of codebase for similar patterns
   - Identify 2-3 key example files to follow
   - Estimate complexity: Simple (1-2 files) vs Complex (needs full PRP)

### 2. **Smart Context Gathering**
   - Find most relevant example files
   - Check project conventions (imports, naming, structure)
   - Identify testing patterns to follow
   - Note any specific requirements or constraints

### 3. **Streamlined Implementation**
   - Create implementation plan using TodoWrite (3-6 tasks max)
   - Focus on core functionality first
   - Follow established patterns from examples
   - Implement with built-in error handling

### 4. **Rapid Validation**
   - Run project's standard validation commands
   - Quick functionality test
   - Fix immediate issues
   - Ensure code follows project style

## Implementation Strategy

### Phase 1: Context & Planning (2-3 minutes)
- **Quick Research**: Find 1-2 similar implementations
- **Pattern Matching**: Identify coding style and structure
- **Task Breakdown**: 3-6 concrete tasks using TodoWrite
- **Validation Setup**: Determine test commands to run

### Phase 2: Core Implementation (5-15 minutes)
- **Follow Patterns**: Mimic existing code structure
- **Incremental Build**: Implement core functionality first
- **Test as You Go**: Run quick tests during development
- **Handle Errors**: Add basic error handling

### Phase 3: Polish & Validate (2-5 minutes)
- **Style Check**: Run linters and formatters
- **Functionality Test**: Ensure feature works as expected
- **Quick Review**: Check against original requirements
- **Documentation**: Add minimal necessary docs

## Context Efficiency Rules

### Minimal Research Approach
1. **Find 1-2 Perfect Examples**: Better than 5 mediocre ones
2. **Focus on Patterns**: Structure, imports, error handling
3. **Skip Deep Dives**: Avoid over-researching obvious implementations
4. **Use Project Tools**: Leverage existing utilities and helpers

### Smart Context Selection
- **Most Recent Similar Code**: Usually shows current patterns
- **Test Files**: Show expected behavior and edge cases
- **Configuration Files**: Reveal project standards and requirements
- **Documentation**: Only if implementation path is unclear

## Automatic Escalation

If during quick analysis you find:
- **Complex Architecture Needed**: Multiple services, new patterns
- **Performance Critical**: Requires optimization or profiling
- **Security Sensitive**: Authentication, data handling, permissions
- **Breaking Changes**: API modifications, database schema changes

→ **ESCALATE**: Stop quick-implement and recommend full PRP workflow:
```
This feature requires more comprehensive planning. Please use:
/generate-prp $ARGUMENTS
```

## Validation Commands Template

### Standard Project Validation
```bash
# Code Quality (adjust for project)
npm run lint || ruff check --fix
npm run type-check || mypy .
npm run format || black . || prettier --write .

# Testing
npm test || pytest || go test
npm run build || python -m build

# Quick functionality test
# [Add project-specific smoke test command]
```

## Success Criteria

- **Speed**: Complete simple features in <20 minutes
- **Quality**: Pass all standard project validations
- **Consistency**: Follow existing code patterns
- **Functionality**: Meet core requirements from feature request

## Quality Gates

### Before Starting
- [ ] Feature is simple/medium complexity
- [ ] Similar patterns exist in codebase
- [ ] Requirements are clear and specific
- [ ] No architectural decisions needed

### After Implementation
- [ ] All validation commands pass
- [ ] Feature works as specified
- [ ] Code follows project patterns
- [ ] Basic error handling included
- [ ] Tests written (if project requires)

## Example Usage

```bash
# Simple utility function
/quick-implement INITIAL.md

# Small API endpoint
/quick-implement feature-requests/api-endpoint.md

# UI component
/quick-implement components/user-profile-widget.md
```

## Error Handling

### Common Quick-Implement Pitfalls
1. **Underestimating Complexity**: If implementation takes >30min, escalate to full PRP
2. **Missing Dependencies**: Check project setup and existing tools
3. **Pattern Mismatch**: If existing code varies significantly, research more
4. **Test Failures**: Use project's test patterns and helper utilities

### Auto-Recovery Strategy
1. **First Failure**: Analyze error, check similar implementations
2. **Second Failure**: Review project documentation and conventions
3. **Third Failure**: Escalate to full PRP workflow with detailed analysis

Remember: Quick-implement prioritizes speed and simplicity. When in doubt, use the full PRP workflow for better results.
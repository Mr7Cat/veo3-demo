# Create PRP follow this system prompt `docs/system-prompt.md`

## Feature file: $ARGUMENTS

Generate a complete PRP for general feature implementation with thorough research. Ensure context is passed to the AI agent to enable self-validation and iterative refinement. Read the feature file first to understand what needs to be created, how the examples provided help, and any other considerations.

The AI agent only gets the context you are appending to the PRP and training data. Assuma the AI agent has access to the codebase and the same knowledge cutoff as you, so its important that your research findings are included or referenced in the PRP. The Agent has Websearch capabilities, so pass urls to documentation and examples.

## Research Process

1. **Codebase Analysis**
   - Search for similar features/patterns in the codebase
   - Identify files to reference in PRP
   - Note existing conventions to follow
   - Check test patterns for validation approach

2. **External Research**
   - Search for similar features/patterns online
   - Library documentation (include specific URLs)
   - Implementation examples (GitHub/StackOverflow/blogs)
   - Best practices and common pitfalls

3. **User Clarification** (if needed)
   - Specific patterns to mirror and where to find them?
   - Integration requirements and where to find them?

## PRP Generation

Using templates/prp_base.md as template:

### Critical Context to Include and pass to the AI agent as part of the PRP
- **Documentation**: URLs with specific sections
- **Code Examples**: Real snippets from codebase
- **Gotchas**: Library quirks, version issues
- **Patterns**: Existing approaches to follow

### Implementation Blueprint
- Start with pseudocode showing approach
- Reference real files for patterns
- Include error handling strategy
- list tasks to be completed to fullfill the PRP in the order they should be completed

### Validation Gates (Must be Executable) eg for python
```bash
# Syntax/Style
ruff check --fix && mypy .

# Unit Tests
uv run pytest tests/ -v

```

## PRP Optimization Strategy

### Context Efficiency Assessment
Before writing the PRP, evaluate:
- **Complexity Level**: Simple|Medium|Complex (affects PRP detail level)
- **Pattern Availability**: High|Medium|Low (existing code to follow)
- **Context Requirements**: Minimal|Standard|Comprehensive

### Smart PRP Generation
- **Simple Features**: Focus on key patterns, minimal documentation
- **Medium Features**: Standard PRP with essential context
- **Complex Features**: Full comprehensive PRP with all details

### Quality Gates Before Writing
- [ ] Found 2-3 relevant example files
- [ ] Identified clear implementation path
- [ ] Validated all documentation links
- [ ] Estimated realistic complexity and timeline
- [ ] Confirmed validation commands are project-appropriate

*** CRITICAL: ASSESS COMPLEXITY AND TAILOR PRP DEPTH ACCORDINGLY ***

## Output
Save as: `docs/{feature-name}.md` 文件名称使用大写字母

## Quality Checklist
- [ ] All necessary context included
- [ ] Validation gates are executable by AI
- [ ] References existing patterns
- [ ] Clear implementation path
- [ ] Error handling documented

Score the PRP on a scale of 1-10 (confidence level to succeed in one-pass implementation using claude codes)

Remember: The goal is one-pass implementation success through comprehensive context.
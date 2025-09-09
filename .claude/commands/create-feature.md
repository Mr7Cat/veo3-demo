# Create Feature Request

## Interactive INITIAL.md Generator

**Purpose**: Intelligently generate a comprehensive INITIAL.md file through guided questions and codebase analysis.

## Process

### 1. **Feature Discovery**
Ask the user key questions to understand their requirements:

#### Basic Information
- **What do you want to build?** (1-2 sentences)
- **Who will use this feature?** (end users, developers, system)
- **How complex do you think this is?** (simple, medium, complex)

#### Functional Requirements
- **What should it do?** (main functionality)
- **What inputs does it need?** (data, user actions, APIs)
- **What outputs should it produce?** (UI, data, files, API responses)
- **How should it integrate with existing systems?**

#### Technical Constraints
- **Any specific technologies required?** (libraries, frameworks, APIs)
- **Performance requirements?** (speed, memory, scalability)
- **Platform constraints?** (web, mobile, desktop, server)

### 2. **Codebase Analysis**
Automatically analyze the project to suggest relevant information:

#### Pattern Detection
```bash
# Search for similar features
find . -name "*.py" -o -name "*.js" -o -name "*.ts" -o -name "*.go" | head -20
grep -r "class\|function\|def\|interface" --include="*.py" --include="*.js" --include="*.ts" | head -10
```

#### Technology Stack Discovery
- Check package.json, requirements.txt, go.mod, Cargo.toml
- Identify testing frameworks
- Note existing patterns and conventions

#### Example Files Identification
- Find 2-3 most relevant example files
- Suggest specific patterns to follow
- Note testing approaches used

### 3. **INITIAL.md Generation**

Generate a comprehensive INITIAL.md using this structure:

```markdown
# [Feature Name] - Feature Request

## FEATURE:
[Detailed description based on user input and analysis]

**User Story**: As a [user type], I want to [goal] so that [benefit].

**Core Functionality**:
- [Key requirement 1]
- [Key requirement 2]  
- [Key requirement 3]

**Technical Requirements**:
- [Technology constraint 1]
- [Performance requirement]
- [Integration requirement]

## EXAMPLES:
[Auto-generated based on codebase analysis]

### Patterns to Follow
- `[filename]`: [What pattern to follow and why]
- `[filename]`: [What aspect is most important]
- `[test-file]`: [Testing approach to copy]

### Architecture Reference
- `[config-file]`: [Configuration patterns]
- `[integration-file]`: [Integration patterns]

## DOCUMENTATION:
[Auto-suggested based on technology stack]

### Primary Documentation
- [Library/Framework docs]: [Specific URL with relevant section]
- [API documentation]: [URL to specific endpoint docs]

### Implementation References
- [Tutorial/Example]: [URL to relevant implementation guide]
- [Best Practices]: [URL to recommended approaches]

### Project-Specific Resources
- [Internal wiki/docs]: [URL if available]
- [Architecture docs]: [URL to system design]

## OTHER CONSIDERATIONS:

### Common Gotchas (Auto-detected)
- [Gotcha 1 based on technology]: [How to handle]
- [Integration pitfall]: [Prevention strategy]
- [Performance consideration]: [Optimization approach]

### Quality Requirements
- **Testing**: [Test coverage expectation based on project]
- **Documentation**: [Doc requirements based on project standards]
- **Performance**: [Benchmarks or requirements]

### Security & Compliance
- [Security requirements if applicable]
- [Data handling considerations]
- [Access control requirements]

## IMPLEMENTATION RECOMMENDATION:
**Suggested Approach**: [Quick Implement|Standard PRP|Expert Mode]

**Rationale**: [Why this approach is recommended]

**Next Steps**:
```bash
# For simple features
/quick-implement INITIAL.md

# For complex features  
/generate-prp INITIAL.md
```
```

### 4. **Smart Suggestions**

Based on codebase analysis, provide intelligent suggestions:

#### Technology Recommendations
- Suggest appropriate libraries already in use
- Recommend existing utilities and helpers
- Point to configuration patterns

#### Implementation Approach
- Recommend Quick Implement vs Full PRP based on complexity
- Suggest breaking down complex features
- Identify potential integration challenges

#### Example Prioritization
- Rank example files by relevance
- Highlight key patterns to follow
- Note architectural decisions to maintain

## User Interaction Flow

### Question Sequence
1. **Feature Description** (required)
2. **Complexity Assessment** (helps determine approach)
3. **Technical Stack** (if not auto-detectable)
4. **Special Requirements** (performance, security, etc.)
5. **Integration Points** (how it connects to existing system)

### Smart Defaults
- Pre-fill technology choices based on project analysis
- Suggest realistic complexity assessment
- Recommend testing approaches based on existing patterns

### Validation
- Check if similar features already exist
- Validate technical choices against project stack
- Ensure requirements are specific and measurable

## Output Quality

### Generated INITIAL.md Should Include:
- [ ] Clear, specific feature description
- [ ] Relevant example files with explanations
- [ ] Accurate documentation links
- [ ] Project-appropriate gotchas and considerations
- [ ] Correct implementation approach recommendation
- [ ] Actionable next steps

### Auto-Validation
- Verify all suggested files exist
- Check that documentation links are accessible
- Ensure example patterns are current and relevant

## Usage Examples

```bash
# Interactive mode
/create-feature

# Quick mode with basic info
/create-feature "Add user authentication with JWT tokens"

# From existing issue/description
/create-feature --from-file requirements.md
```

Remember: The goal is to create INITIAL.md files that lead to successful one-pass implementations by providing comprehensive, project-specific context.
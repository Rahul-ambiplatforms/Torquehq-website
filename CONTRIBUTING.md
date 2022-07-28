# TorqueHQ Contributor Guidelines

* [General Procedure](#general_procedure)
* [Architecture Decision Records (ADR)](#adr)
* [Forking](#forking)
* [Dependencies](#dependencies)
* [Development Procedure](#dev_procedure)
* [Testing](#testing)
* [Updating Documentation](#updating_doc)
* [Branching Model and Release](#braching_model_and_release)
    * [PR Targeting](#pr_targeting)
    * [Pull Requests](#pull_requests)
    * [Process for reviewing PRs](#reviewing_prs)
    * [Pull Merge Procedure](#pull_merge_procedure)
    * [Release Procedure](#release_procedure)

## <span id="general_procedure">General Procedure</span>

Thank you for considering making contributions to TorqueHQ and related repositories!

Contributing to this repo can mean many things such as participating in discussion or proposing code changes. To ensure
a smooth workflow for all contributors, the following general procedure for contributing has been established:

1. Either [open](https://github.com/TORQUE-AMBIPLATFORMS/Torquehq-website/issues/new/choose)
   or [find](https://github.com/TORQUE-AMBIPLATFORMS/Torquehq-website/issues) an issue you have identified and would like to contribute to
   resolving.
2. Participate in thoughtful discussion on that issue.
3. If you would like to contribute:
    1. If the issue is a proposal, ensure that the proposal has been accepted by the TorqueHQ team.
    2. Ensure that nobody else has already begun working on the same issue. If someone already has, please make sure to
       contact the individual to collaborate.
    3. If nobody has been assigned the issue and you would like to work on it, make a comment on the issue to inform the
       community of your intentions to begin work. Ideally, wait for confirmation that no one has started it. However,
       if you are eager and do not get a prompt response, feel free to dive on in!
    4. Follow standard Github best practices:
        1. Fork the repo
        2. Branch from the HEAD of `development`(For core developers working within the website repo, to ensure a
           clear ownership of branches, branches must be named with the convention `{moniker}/{issue#}-branch-name`).
        3. Make commits
        4. Submit a PR to `development`
    5. Be sure to submit the PR in `Draft` mode. Submit your PR early, even if it's incomplete as this indicates to the
       community you're working on something and allows them to provide comments early in the development process.
    6. When the code is complete it can be marked `Ready for Review`.
    7. Be sure to include a relevant change log entry in the `Unreleased` section of `CHANGELOG.md` (see file for log
       format).

**Note**: for very small or blatantly obvious problems (such as typos), it is not required to open an issue to submit a
PR, but be aware that for more complex problems/features, if a PR is opened before an adequate design discussion has
taken place in a github issue, that PR runs a high likelihood of being rejected.

Looking for a good place to start contributing? How about checking out
some [good first issues](https://github.com/TORQUE-AMBIPLATFORMS/Torquehq-website/issues?q=label%3A%22good+first+issue%22).

## <span id="adr">Architecture Decision Records (ADR)</span>

When proposing an architecture decision for TorqueHQ repos, please create
an ADR so further discussions can be
made. We are following this process so all involved parties are in agreement before any party begins coding the proposed
implementation.

## <span id="forking">Forking</span>

For instance, to create a fork and work on a branch of it, you would:

1. Create the fork on github, using the fork button.
2. Go to the original repo checked out locally. (i.e. `Torquehq-website`)
3. `git remote rename origin upstream`
4. `git remote add origin git@github.com:TORQUE-AMBIPLATFORMS/Torquehq-website.git`

Now `origin` refers to my fork and `upstream` refers to the TorqueHQ version. So I can `git push -u origin master` to
update my fork, and make pull requests to TorqueHQ from there. Of course, replace `TORQUE-AMBIPLATFORMS` with your git handle.

To pull in updates from the origin repo, run:

1. `git fetch upstream`
2. `git rebase upstream/master` (or whatever branch you want)

Please **NO DOT** make Pull Requests from `development`.

## <span id="dependencies">Dependencies</span>

We use [npm](https://github.com/npm/cli/wiki) to manage dependency versions and [nodemon](https://github.com/remy/nodemon/wiki) for server deployment.

The master branch of every TorqueHQ website repository should just build with `nodemon app.js`, which means they should be kept up-to-date
with their dependencies, so we can get away with telling people they can just `nodemon` our software.

Since some dependencies are not under our control, a third party may break our build.

## <span id="dev_procedure">Development Procedure</span>

1. The latest state of development is on `development`.
2. `development` must never
   fail tests.
3. No `--force` onto `development` (except when reverting a broken commit, which should seldom happen).
4. Create your feature branch from `development` either on `github.com/TORQUE-AMBIPLATFORMS/Torquehq-website`, or your fork (
   using `git remote add origin`).
5. Before submitting a pull request, begin `git rebase` on top of `development`.

## <span id="testing">Testing</span>

TorqueHQ uses [GitHub Actions](https://github.com/features/actions) for automated testing.

## <span id="updating_doc">Updating Documentation</span>

If you open a PR on the TorqueHQ website repo, it is mandatory to update the relevant documentation in `/docs`. Please refer to
the docs subdirectory and make changes accordingly. Prior to approval, the Code owners/approvers may request some
updates to specific docs.

## <span id="braching_model_and_release">Branching Model and Release</span>

User-facing repos should adhere to the [trunk based development branching model](https://trunkbaseddevelopment.com/).

Libraries need not follow the model strictly, but would be wise to.

TorqueHQ utilizes [semantic versioning](https://semver.org/).

### <span id="pr_targeting">PR Targeting</span>

Ensure that you base and target your PR on the `development` branch.

All feature additions should be targeted against `development`. Bug fixes for an outstanding release candidate should be
targeted against the release candidate branch.

### <span id="pull_requests">Pull Requests</span>

To accommodate the review process, we suggest that PRs are categorically broken up. Ideally each PR addresses only a
single issue. Additionally, as much as possible code refactoring and cleanup should be submitted as separate PRs from
bug fixes/feature-additions.

### <span id="reviewing_prs">Process for reviewing PRs</span>

All PRs require two Reviews before merge. When reviewing PRs, please use the following review explanations:

1. `LGTM` without an explicit approval means that the changes look good, but you haven't pulled down the code, run tests
   locally and thoroughly reviewed it.
2. `Approval` through the GH UI means that you understand the code, documentation/spec is updated in the right places,
   you have pulled down and tested the code locally. In addition:
    * You must think through whether any added code could be partially combined (DRYed) with existing code.
    * You must think through any potential security issues or incentive-compatibility flaws introduced by the changes.
    * Naming convention must be consistent with the rest of the codebase.
    * Code must live in a reasonable location, considering dependency structures (e.g. not importing testing modules in
      production code, or including example code modules in production code).
    * If you approve of the PR, you are responsible for fixing any of the issues mentioned here.
3. If you are only making "surface level" reviews, submit any notes as `Comments` without adding a review.

### <span id="pull_merge_procedure">Pull Merge Procedure</span>

1. Ensure pull branch is rebased on `development`.
2. Ensure that all tests pass.
3. Squash merge pull request.

### <span id="release_procedure">Release Procedure</span>

1. Start on `development`.
2. Create the release candidate branch `rc/v*` (going forward known as `RC`) and ensure it's protected against pushing
   from anyone except the release manager/coordinator. No PRs targeting this branch should be merged unless exceptional
   circumstances arise.
3. On the `RC` branch, prepare a new version section in the `CHANGELOG.md`. All links must be link-ified:
   `$ python ./scripts/linkify_changelog.py CHANGELOG.md`  
   Copy the entries into a `RELEASE_CHANGELOG.md`. This is needed so the bot knows which entries to add to the release
   page on github.
4. Kick off a large round of simulation testing.
5. If errors are found during the simulation testing, commit the fixes to `development` and create a new `RC` branch (
   making sure to increment the `rcN`).
6. After simulation has successfully completed, create the release branch (`release/vX.XX.X`) from the `RC` branch.
7. Create a PR to `development` to incorporate the `CHANGELOG.md` updates.
8. Tag the release (use `git tag -a`) and create a release in Github.
9. Delete the `RC` branches.

**Note**: 
TorqueHQ’s team currently cuts releases on a need to have basis. We will announce a more
standardized release schedule as we near production readiness.


# EtherDer

### Local deployment guide 
#### Prerequisites
1. Docker
2. Patience
3. Missing individual packages (might need to install homebrew)
####

**_MacOS M1 arm64: (https://docs.docker.com/desktop/install/mac-install/)
Must add DOCKER_DEFAULT_PLATFORM=linux/amd64 before building in .bashrc|.zshrc|.zprofile|.profile_**
    
    # you can reach the path by:
    nano ~/.zshrc
    export DOCKER_DEFAULT_PLATFORM=linux/amd64
    # main edits after alpha & beta testing: removed tensorflow completely as it requires too many steps for compatibility with arm64, removed aws extension and left local 24h jwt login token, removed doppler, removed any possible tensorflow connection with docker again due to arm64 and troubleshooting time required for non-coding beta testers  

    # to lauch a makefile
    sudo make start

    # to launch frontend
    npm i
    npm run dev 






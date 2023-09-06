
# EtherDer

### Local deployment guide 
#### Prerequisites
1. Docker
2. Patience
3. Missing individual packages (might need to install homebrew, additional needed packages)
####

**_MacOS M1 arm64: (https://docs.docker.com/desktop/install/mac-install/)
Must add DOCKER_DEFAULT_PLATFORM=linux/amd64 before building in .bashrc|.zshrc|.zprofile|.profile_**
    
    # you can reach the path by:
    nano ~/.zshrc
    export DOCKER_DEFAULT_PLATFORM=linux/amd64

    # main edits after alpha & beta testing: removed tensorflow completely as it requires too many steps for compatibility with arm64, removed aws extension and left local 24h jwt login token, removed doppler, removed any possible tensorflow connection with docker again due to arm64 and troubleshooting time required   

    # to lauch a makefile
    sudo make start

    # to launch frontend
    npm i
    npm run dev 


### Jupyter Hub notebooks
#### Prerequisites
1. (Mini)anaconda - https://docs.conda.io/en/latest/miniconda.html
1.1. Possibly Python - version 3.8+
2. For Arm64 lots of patience and environment kernel setup based on Tensorflow, rather than importing it directly. For Silicon chips use 
	
	# may need to install xcode, however MacOs provide UI
	xcode-select --install

	# get jupyter
	conda install -y jupyter

	# deactivate base
	conda deactivate

	# create tensorflow kernel and use file from the great @jeffheaton here: https://raw.githubusercontent.com/jeffheaton/t81_558_deep_learning/master/tensorflow-apple-metal.yml 
	conda env create -f tensorflow-apple-metal.yml -n tensorflow	

	# prepare the kernel
	conda activate tensorflow

	# if python was not installed before, if installed just choose the preferred version
	python -m ipykernel install --user --name tensorflow --display-name "Python 3.10 (tensorflow)"

	# enter the notebook
	jupyter notebook

3. There have been an issue again with arm64 for "activating" the GPU. One of the cells contain:

	gpu = len(tf.config.list_physical_devices('GPU'))>0

If the model is stuck on calculation - stop the cell that contains this line and restart just this cell again - by doing that we confirm that Tensorflow is using the GPU 

4. If there are missing packages for notebook, you can create a cell above and write:

	!pip install 'missing packages'
	# or just download everything in the same terminal page as activated environment!

	

Thank you for reading! :)


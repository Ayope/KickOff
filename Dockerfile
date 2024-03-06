FROM node:latest

# Install dependencies
RUN apt-get update && \
    apt-get install -y wget unzip && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Install Android SDK tools
ENV ANDROID_SDK_ROOT=/opt/android-sdk
ENV ANDROID_SDK_TOOLS_DIR=${ANDROID_SDK_ROOT}/tools

RUN mkdir -p ${ANDROID_SDK_ROOT} && \
    wget -q https://dl.google.com/android/repository/commandlinetools-linux-6858069_latest.zip -O android-sdk.zip && \
    unzip -q android-sdk.zip -d ${ANDROID_SDK_TOOLS_DIR} && \
    rm -f android-sdk.zip

# Set up environment variables (updated path)
ENV PATH=${PATH}:${ANDROID_SDK_TOOLS_DIR}/bin:${ANDROID_SDK_ROOT}/platform-tools

# Manually accept Android SDK licenses
RUN mkdir -p ${ANDROID_SDK_ROOT}/licenses && \
    echo "24333f8a63b6825ea9c5514f83c2829b004d1fee" > ${ANDROID_SDK_ROOT}/licenses/android-sdk-license && \
    echo "8933bad161af4178b1185d1a37fbf41ea5269c55" > ${ANDROID_SDK_ROOT}/licenses/android-sdk-preview-license && \
    echo "84831b9409646a918e30573bab4c9c91346d8abd" > ${ANDROID_SDK_ROOT}/licenses/intel-android-extra-license

WORKDIR /app

COPY package*.json ./

RUN npm install

# Make sure to copy project files after npm install
COPY . .

EXPOSE 19000

CMD ["npm", "start", "--", "--host", "lan"]

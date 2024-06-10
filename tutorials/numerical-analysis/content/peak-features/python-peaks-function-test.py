import numpy as np
from scipy.signal import savgol_filter

def findPeaks(xData, yData, smoothWidth, peakGroup, heightThreshold, locationThreshold):
    # Smooth the data using the Savitzky-Golay filter
    smoothedCurrent = savgol_filter(yData, window_length=smoothWidth, polyorder=2)

    # Compute the derivative
    h = xData[1] - xData[0]
    derivative = np.gradient(smoothedCurrent, h)

    # Find the peak groups
    peakGroups = []
    currentPeakGroup = []
    lastDerivative = 0
    for i in range(len(xData)):
        if np.sign(derivative[i]) != np.sign(lastDerivative):
            for n in range(int(peakGroup)):
                currentPeakGroup.append(i+n)
            peakGroups.append(currentPeakGroup)
            currentPeakGroup = []
        lastDerivative = derivative[i]

    # Find the peak locations and heights
    prevMeanY = 0
    xFiltered = []
    yFiltered = []
    peakIndexes = []
    for group in peakGroups:
        x = xData[group]
        y = yData[group]
        meanX = np.mean(x)
        meanY = np.mean(y)
        if meanY > prevMeanY + heightThreshold:
            xFiltered.append(x[0])
            yFiltered.append(meanY)
            peakIndexes.append(group[np.argmax(y)])
        prevMeanY = meanY

    peakLocations = []
    peakHeights = []
    prevXFiltered = 0
    for i in range(len(xFiltered)):
        if xFiltered[i] > prevXFiltered + locationThreshold:
            peakLocations.append(xFiltered[i])
            peakHeights.append(yFiltered[i])
        prevXFiltered = xFiltered[i]

    return peakLocations, peakHeights, peakIndexes



import numpy as np
from scipy.signal import savgol_filter

def trapz(x, y, start, end):
    return np.trapz(y[start:end+1], x[start:end+1])

def findFeatures(xData, yData, indexes, smoothWidth):
    yData = savgol_filter(yData, window_length=smoothWidth, polyorder=2)
    yDeriv = np.gradient(yData)

    if indexes[0] == 0:
        return None

    xValsFullHeight = np.zeros((2, 2), dtype=float)
    yValsFullWidth = np.zeros((2, 2), dtype=float)
    fullHeight = np.zeros(2, dtype=float)
    xValsHalfHeight = np.zeros((2, 2), dtype=float)
    FWHM = np.zeros(2, dtype=float)
    peakArea = np.zeros(2, dtype=float)
    xIndsFullHeight = np.zeros((2, 2), dtype=int)

    for j in range(2):
        for i in range(indexes[j]-1, -1, -1):
            if yDeriv[i] < 0:
                xValsFullHeight[j][0] = xData[i]
                yValsFullWidth[j][0] = yData[i]
                xIndsFullHeight[j][0] = i
                break
        for i in range(indexes[j]+1, len(xData)):
            if yDeriv[i] > 0:
                xValsFullHeight[j][1] = xData[i]
                yValsFullWidth[j][1] = yData[i]
                xIndsFullHeight[j][1] = i
                break

    for j in range(2):
        fullHeight[j] = yData[indexes[j]] - (yValsFullWidth[j][0] + (yValsFullWidth[j][1] - yValsFullWidth[j][0]) / 2 )
        for i in range(indexes[j]-1, -1, -1):
            if yData[i] < yData[indexes[j]] - fullHeight[j] / 2:
                xValsHalfHeight[j][0] = xData[i]
                break
        for i in range(indexes[j]+1, len(xData)):
            if yData[i] < yData[indexes[j]] - fullHeight[j] / 2:
                xValsHalfHeight[j][1] = xData[i]
                break
        FWHM[j] = xValsHalfHeight[j][1] - xValsHalfHeight[j][0]

    for j in range(2):
        peakArea[j] = trapz(xData, yData, xIndsFullHeight[j][0], xIndsFullHeight[j][1])

    return peakArea, fullHeight, FWHM, xValsFullHeight, xValsHalfHeight




import numpy as np
from scipy.signal import savgol_filter
import matplotlib.pyplot as plt

# Set the seed for reproducibility
np.random.seed(42)

# Generate the noisy data
numPoints = 300
voltage = np.linspace(0, 10, numPoints)
current = (0.5 * np.exp(-((voltage - 3) ** 2 / (2 * 0.5 ** 2))) +
           0.25 * np.exp(-((voltage - 5.0) ** 2 / (2 * 0.5 ** 2))) +
           0.06 * (np.random.rand(numPoints) - 0.5) + 0.05)

# Call the findPeaks function
smoothWidth = 20
peakGroup = 5
heightThreshold = 0.1
locationThreshold = 0.5
peakLocations, peakHeights, peakIndexes = findPeaks(voltage, current, smoothWidth, peakGroup, heightThreshold, locationThreshold)
peakArea, fullHeight, FWHM, xValsFullHeight, xValsHalfHeight = findFeatures(voltage, current, peakIndexes, smoothWidth)

print("peakLocations: ", peakLocations, "; peakHeights: ", peakHeights, "; peakIndexes: ", peakIndexes, "; peakArea: ", peakArea,
      "; fullHeight: ", fullHeight, "; FWHM: ", FWHM)

# # Plot the data and peaks
# plt.plot(voltage, current, label='Noisy data')
# plt.plot(voltage, savgol_filter(current, smoothWidth, 2), label='Smoothed data')
# plt.plot(peakLocations, peakHeights, 'rx', label='Peaks')
# plt.xlabel('Voltage')
# plt.ylabel('Current')
# plt.legend()
# plt.show()
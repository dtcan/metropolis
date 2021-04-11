# Metropolis Sampling
A demonstration of Metropolis sampling, viewable [here](https://dtcan.dev/metropolis).

This demo uses the Metropolis sampling algorithm to sample from a distribution defined by a greyscale image.

An initial sample is taken from a uniform distibution over the unit square. Future samples are taken from a normal distribution centered around the previous sample.

To generate the sample, I sample uniformly from the unit square.

![U_1,U_2~U[0,1]](https://latex.codecogs.com/png.latex?U_1,U_2\sim%20U[0,1])

Then I use the [Box-Muller transform](https://en.wikipedia.org/wiki/Box%E2%80%93Muller_transform) to transform the sample into a standard normal distribution sample.

![~Z_1=sqrt(-2 log(U_1)) * cos(2 pi U_2)](https://latex.codecogs.com/png.latex?\tilde{Z}_1=\sqrt{-2\log%20U_1}\cos(2\pi%20U_2))

![~Z_2=sqrt(-2 log(U_1)) * cos(2 pi U_2)](https://latex.codecogs.com/png.latex?\tilde{Z}_2=\sqrt{-2\log%20U_1}\sin(2\pi%20U_2))

Finally I transform that sample using the previous sample as the mean and the given standard deviation (defined by the `logSigma` parameter).

![Z_1=Z'_1 + e^(logSigma) * ~Z_1](https://latex.codecogs.com/png.latex?Z_1=Z'_1+e^{\log\sigma}\tilde{Z}_1)

![Z_2=Z'_2 + e^(logSigma) * ~Z_2](https://latex.codecogs.com/png.latex?Z_2=Z'_2+e^{\log\sigma}\tilde{Z}_2)

The new sample is accepted using the ratio of the probabilities of the new sample and the previous sample in the posterior distribution.

![a=p(Z_1,Z_2)/p(Z'_1,Z'_2)](https://latex.codecogs.com/png.latex?a=\frac{p(Z_1,Z_2)}{p(Z'_1,Z'_2)})

The posterior is defined by a greyscale image (coordinates are scaled so that the smaller dimension of the image is 1). The values in the image are not normalized to sum to 1, but this is okay since I am finding the ratio, which is unaffected by a common scaling factor.

It's worth noting that Metropolis sampling is not needed to sample from the image, since sampling from a categorical distribution is tractable, but I use this algorithm here for the purpose of demonstrating it.

By default, an image taken from the CelebA dataset is used. You can intuitively tell when the sample distribution is approaching the target distribution as the face becomes more recognizable.

You can provide your own image using the `image` URL parameter. For example, `https://dtcan.dev/metropolis?image=https://i.imgur.com/to6Onpy.jpg`

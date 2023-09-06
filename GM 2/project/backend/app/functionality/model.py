import math
from scipy.stats import norm


class EtherCallOption:
    def __init__(self, S, K, T, r, sigma):
        self.option_type = 'call'
        self.S = S # underlying price
        self.K = K # strike price
        self.T = T # time left
        self.r = r # risk-free rate
        self.sigma = sigma # volatility

    def black_scholes(self):
        d1 = (math.log(self.S / self.K) + (self.r + 0.5 * self.sigma ** 2) * self.T) / (self.sigma * math.sqrt(self.T))
        d2 = d1 - self.sigma * math.sqrt(self.T)

        call_price = self.S * norm.cdf(d1) - self.K * math.exp(-self.r * self.T) * norm.cdf(d2)
        return call_price

    

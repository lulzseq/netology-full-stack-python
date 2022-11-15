
import time


class Solution(object):
    def timeit(wrapped_func):
        def wrap_func(*args, **kw):
            t = time.time_ns()
            result = wrapped_func(*args, **kw)
            print('Processing time of %s(): %.2f seconds.' %
                  (wrapped_func.__qualname__, time.time_ns() - t))
            return result

        return wrap_func

    @timeit
    def func(self, n):
        def check_simple(number):
            if number > 1:  
                for i in range(2, int(number/2) + 1):  
                    if number % i == 0:  
                        return False
                return True
            else:
                return False

        arr = []
        i = 2

        while len(arr) < n:
            if check_simple(i):
                arr.append(i)
            i += 1

        return arr


if __name__ == '__main__':
    obj = Solution()
    print(obj.func(5))

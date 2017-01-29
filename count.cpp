#include <iostream>
#include <unistd.h>


int main()
{
    int i = 0;
    while(i < 100000) {
        std::cout << "i = " << i << std::endl;
        // delay(100);
        unsigned int microseconds = 1000000;
        usleep(microseconds);

        ++i;
    }
}

#include <iostream>
using namespace std;

void staticAllocation() {
    int arr[5] = {1, 2, 3, 4, 5};
    cout << "\n--- Static Array ---\n";
    for (int i = 0; i < 5; i++) {
        cout << "[" << arr[i] << "] @ " << &arr[i] << endl;
    }
}

void dynamicAllocation() {
    int size;
    cout << "\nEnter size of dynamic array: ";
    cin >> size;
    int* arr = new int[size];

    for (int i = 0; i < size; i++) {
        arr[i] = (i + 1) * 10;
    }

    cout << "\n--- Dynamic Array ---\n";
    for (int i = 0; i < size; i++) {
        cout << "[" << arr[i] << "] @ " << &arr[i] << endl;
    }

    char resizeChoice;
    cout << "\nDo you want to resize the array? (y/n): ";
    cin >> resizeChoice;

    if (resizeChoice == 'y' || resizeChoice == 'Y') {
        int newSize;
        cout << "Resize array to size: ";
        cin >> newSize;
        int* newArr = new int[newSize];
        for (int i = 0; i < newSize && i < size; i++) {
            newArr[i] = arr[i];
        }
        delete[] arr;
        arr = newArr;

        cout << "\n--- Resized Array ---\n";
        for (int i = 0; i < newSize; i++) {
            cout << "[" << arr[i] << "] @ " << &arr[i] << endl;
        }
    }

    delete[] arr;
}

int main() {
    int choice;

    do {
        cout << "\n=== Memory Manager Simulator ===\n";
        cout << "1. Static Allocation\n";
        cout << "2. Dynamic Allocation\n";
        cout << "3. Exit\n";
        cout << "Choice: ";
        cin >> choice;

        switch (choice) {
            case 1:
                staticAllocation();
                break;
            case 2:
                dynamicAllocation();
                break;
            case 3:
                cout << "Exiting program.\n";
                break;
            default:
                cout << "Invalid choice. Try again.\n";
        }

    } while (choice != 3);

    return 0;
}

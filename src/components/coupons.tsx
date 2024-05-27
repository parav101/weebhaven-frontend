import React from "react";
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react";


export function DialogDefault(props:any) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);



  return (
    <>
      <Button onClick={() => handleOpen()} className="flex md:mx-0 mx-auto mt-2 bg-gray-500 items-center gap-2 p-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w- h-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 3.75v16.5M2.25 12h19.5M6.375 17.25a4.875 4.875 0 0 0 4.875-4.875V12m6.375 5.25a4.875 4.875 0 0 1-4.875-4.875V12m-9 8.25h16.5a1.5 1.5 0 0 0 1.5-1.5V5.25a1.5 1.5 0 0 0-1.5-1.5H3.75a1.5 1.5 0 0 0-1.5 1.5v13.5a1.5 1.5 0 0 0 1.5 1.5Zm12.621-9.44c-1.409 1.41-4.242 1.061-4.242 1.061s-.349-2.833 1.06-4.242a2.25 2.25 0 0 1 3.182 3.182ZM10.773 7.63c1.409 1.409 1.06 4.242 1.06 4.242S9 12.22 7.592 10.811a2.25 2.25 0 1 1 3.182-3.182Z" />
        </svg>
        Check coupons
      </Button>
      <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader>Coupons available</DialogHeader>
        <DialogBody>
         {props.allCoupons.map((coupon:any)=>{
            return(
                <p className="text-base font-mono text-gray-500 max-w-fit ps-4">
                use <span className="text-gray-900">{coupon?.code}</span> to {coupon?.desc}
              </p>
            )
         })}
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="green" onClick={handleOpen}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

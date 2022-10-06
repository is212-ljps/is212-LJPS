import React from "react";

import Image from "next/image";

export default function SelectRole() {
  return (
    <div>
      <div className="row">
        <div className="col-md-5 col-sm-12 d-flex justify-content-center align-items-center">
          <h3 className="p-5"> Select a Role to kickstart your Learning Journey</h3>
        </div>

        <div className="col-md-7 col-sm-12 d-flex justify-content-center">
          <Image src="/select-role.svg" height={450} width={450}/>
        </div>
      </div>
    </div>
  );
}
